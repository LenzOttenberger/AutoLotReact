export default function User({username, mail, phone}) {
    return(
        <div className="User">
            <p>Name: {username}</p>
            <p>Mail: {mail}</p>
            <p>Phone Number {phone}</p>
        </div>
    )
}