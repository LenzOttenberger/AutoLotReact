const { text } = require('express')
const pool = require('../connection')
const random = require('../utils/utils')

module.exports = {
    get: async (req, res) => {
        res.json({ok: 13})
    },
    login: async (req, res) => {
        if(!req.session.user) {
            const {login, password} = req.body

            const result = await pool.query(`SELECT username, password, id FROM Users WHERE username = '${login}' AND password = '${password}'`)
            if(result.rows[0]) {
                if(result.rows[0].username === login && result.rows[0].password === password) {
                    req.session.user = result.rows[0].id
                    res.status(200).send({success: true})
                } else {
                    res.status(401).send({success: false})
                }
            } else {
                res.status(401).send({success: false})
            }
        } else {
            res.redirect('/')
        }
    },
    registration: async (req, res) => {
        if(!req.session.user) {
            const {username, password, mail, phone} = req.body
            let id = random.getRandomID()
            while(true) {
                const check = await pool.query(`SELECT id FROM Users WHERE id = '${id}'`)
                if(check.rows.length == 0) {
                    break
                } else {
                    id = random.getRandomID()
                }
            }

            console.log(id)

            const check = await pool.query(`SELECT * FROM Users WHERE username = '${username}' OR mail = '${mail}' OR phone = '${phone}'`)
            if(check.rowCount == 0) {
                const result = await pool.query(`INSERT INTO Users VALUES('${username}', '${password}', '${mail}', '${phone}', '${id}')`)
                if(result.rows) {
                    res.status(201).send({success: true})
                } else {
                    res.status(203).send({success: false})
                }
            } else {
                res.status(203).send({error: 'This data always exist!'})
            }
        } else {
            res.redirect('/')
        }
    },
    checkAuth: async (req, res) => {
        if(req.session.user) {
            res.status(200).send({success: true})
        } else {
            res.status(401).send({success: false})
        }
    },
    getUser: async(req, res) => {
        if(req.session.user) {
            const user = await pool.query(`SELECT * FROM Users WHERE id = '${req.session.user}'`)
            const userLots = await pool.query(`SELECT * FROM lots WHERE author_id = '${req.session.user}'`)

            if(user.rowCount == 1) {
                res.status(201).send({success: true, username: user.rows[0].username, mail: user.rows[0].mail, phone: user.rows[0].phone, userLots: userLots})
            } else {
                res.status(203).send({success: false})
            }
        } else {
            res.status(401).send({success: false})
        }
    },
    leave: async(req, res) => {
        if(req.session.user) {
            req.session.user = ''

            if(!req.session.user) {
                res.status(201).send({success: true})
            } else {
                res.status(203).send({success: false})
            }
        } else {
            res.status(401).send({success: false})
        }
    },
    addNewLot: async(req, res) => {
        if(req.session.user) {
            const {brand, model, generation, cost, year, gear, body} = req.body

            const id = random.getRandomIDforLot()
            const author_id = req.session.user

            const date = new Date()

            const check = await pool.query(`SELECT * FROM lots WHERE id = '${id}'`)
            const checkBrand = await pool.query(`SELECT * FROM brands WHERE brand='${brand}'`)
            const checkModel = await pool.query(`SELECT * FROM models WHERE model='${model}' AND brand='${brand}'`)
            const checkGeneration = await pool.query(`SELECT * FROM generations WHERE generation='${generation}' AND model='${model}'`)

            if(check.rowCount == 0) {
                const add = await pool.query(`INSERT INTO lots VALUES('${brand}', '${model}', '${generation}', '${cost}', '${gear}', '${body}', '${date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()}', '${id}', '${author_id}', '${year}')`)

                if(checkBrand.rowCount == 0) {
                    await pool.query(`INSERT INTO brands VALUES('${brand}')`)
                }
                if(checkModel.rowCount == 0) {
                    await pool.query(`INSERT INTO models VALUES('${model}', '${brand}')`)
                }
                if(checkGeneration.rowCount == 0) {
                    await pool.query(`INSERT INTO generations VALUES('${generation}', '${model}')`)
                }

                if(add.rows) {
                    res.status(201).send({success: true})
                } else {
                    res.status(203).send({success: false})
                }
            } else {
                res.status(203).send({error: 'This data always exist!'})
            } 
        } else {
            res.redirect('/')
        }
    },
    getLots: async(req, res) => {
        const {brand, model, generation, gear, body, cost, year} = req.body

        try {
            let textForQuery = '';

            if(textForQuery && brand && brand != 'Brand') {
                textForQuery += ` AND brand='${brand}'`
            } else if(!textForQuery && brand && brand != 'Brand') {
                textForQuery += ` brand='${brand}'`
            }

            if(textForQuery && model && model != 'Model') {
                textForQuery += ` AND model='${model}'`
            } else if(!textForQuery  && model && model != 'Model') {
                textForQuery += ` model='${model}'`
            }

            if(textForQuery && generation && generation != 'Generation') {
                textForQuery += ` AND generation='${generation}'`
            } else if(!textForQuery && generation && generation != 'Generation') {
                textForQuery += ` generation `
            }

            if(textForQuery && gear && gear != 'Gear') {
                textForQuery += ` AND gear='${gear}'`
            } else if(!textForQuery && gear && gear != 'Gear') {
                textForQuery += ` gear='${gear}'`
            }

            if(textForQuery && body && body != 'Body') {
                textForQuery += ` AND body='${body}'`
            } else if(!textForQuery && body && body != 'Body') {
                textForQuery += ` body='${body}'`
            }

            if((cost.from != 0 && cost.to == 0) && textForQuery) {
                textForQuery += ` AND cost >= ${cost.from}`
            } else if((cost.from != 0 && cost.to == 0) && !textForQuery) {
                textForQuery += ` cost >= ${cost.from}`
            } else if((cost.from == 0 && cost.to != 0) && textForQuery) {
                textForQuery += ` AND cost <= ${cost.to}`
            } else if((cost.from == 0 && cost.to != 0) && !textForQuery) {
                textForQuery += ` cost <= ${cost.to}`
            } else if ((cost.from != 0 && cost.to != 0) && textForQuery) {
                textForQuery += ` AND cost >= ${cost.from} AND cost <= ${cost.to}`
            } else if((cost.from != 0 && cost.to != 0) && !textForQuery) {
                textForQuery += ` cost >= ${cost.from} AND cost <= ${cost.to}`
            }

            if((year.from != 0 && year.to == 0) && textForQuery) {
                textForQuery += ` AND year >= ${year.from}`
            } else if((year.from != 0 && year.to == 0) && !textForQuery) {
                textForQuery += ` year >= ${year.from}`
            } else if((year.from == 0 && year.to != 0) && textForQuery) {
                textForQuery += ` AND year <= ${year.to}`
            } else if((year.from == 0 && year.to != 0) && !textForQuery) {
                textForQuery += ` year <= ${year.to}`
            } else if ((year.from != 0 && year.to != 0) && textForQuery) {
                textForQuery += ` AND year >= ${year.from} AND year <= ${year.to}`
            } else if((year.from != 0 && year.to != 0) && !textForQuery) {
                textForQuery += ` year >= ${year.from} AND year <= ${year.to}`
            }

            const query = `SELECT * FROM lots WHERE ${textForQuery}`
            console.log(query)
            const lots = await pool.query(`${query}`)

            if(lots.rowCount != 0) {
                res.status(201).send({success: true, lotList: lots.rows})
            } else {
                res.status(203).send({success: false, error: `Can't find any lots`})
            }
        } catch (error) {
            console.log(error)
            res.status(203).send({success: false, error: `Can't find any lots`})
        }
    },
    getData: async(req, res) => {
        const {type, data} = req.body
        let result, resultData

        switch(type) {
            case 'brand': {
                result = await pool.query(`SELECT * FROM brands`)
                result = result.rows.map((item) => {
                    return item.brand
                })
                result.unshift('Brand')
                resultData = 'brand'
                break
            } case 'model': {
                result = await pool.query(`SELECT * FROM models WHERE brand='${data}'`)
                result = result.rows.map((item) => {
                    return item.model
                })
                result.unshift('Model')
                resultData = 'model'
                break
            } case 'generation': {
                result = await pool.query(`SELECT * FROM generations WHERE model='${data}'`)
                result = result.rows.map((item) => {
                    return item.generation
                })
                result.unshift('Generation')
                resultData = 'generation'
                break
            } case 'gear': {
                result = await pool.query(`SELECT * FROM gears`)
                result = result.rows.map((item) => {
                    return item.gear
                })
                result.unshift('Gear')
                resultData = 'gear'
                break
            } case 'body': {
                result = await pool.query(`SELECT * FROM bodies`) 
                result = result.rows.map((item) => {
                    return item.body
                })
                result.unshift('Body')
                resultData = 'body'
                break
            }
        }

        res.status(201).send({success: true, data: resultData, list: result})
    }
}
