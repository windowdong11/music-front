const valid = (username, email, password) => {
    if(!username || !email || !password) return 'Please add all fields.'

    if(!validEmail(email)) return 'Invalid emails'

    if(!validPassword(password)) return 'Invalid password'

    if(!validUsername(username)) return 'Invalid username'
}


const validUsername = (username) => {
    return /^[a-z0-9가-힣\\s]{4,20}$/.test(username)
}

const validPassword = (password) => {
    /**
     *  "비밀번호는 6자 이상 40자 이하이며 하나 이상의 숫자 및 문자, 특수문자가 필요합니다.",
     */
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,40}$/.test(password)
}

const validEmail = (password) => {
    return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(password)
}

export default valid
export {validUsername, validPassword, validEmail}