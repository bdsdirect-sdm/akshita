import { Local } from '../../env';



const loginTemplate = (token: string, fullName: string, message: string, senderName: string) => {
    const Link = `${Local.BASE_URL}/login?${token}`
    
    return `Hi, <b>${fullName} </b>. ${senderName} sent you a request to connect with them at WaveGram by clicking on below link </br> Message by <b>${fullName} </b> for you: ${message} <br><br> <a href="${Link}" target='_blank' > ${Link} </a>`;
}

export default loginTemplate;