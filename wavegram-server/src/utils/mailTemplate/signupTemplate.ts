import { Local } from '../../env';

const signupTemplate = (token: string, fullName: string, message: string, senderName: string) => {
    const Link = `${Local.BASE_URL}/signup?${token}`
    console.log("BASE", Local.BASE_URL)
    return `Hi, <b>${fullName} </b>. ${senderName} sent you a request to connect with them at WaveGram by clicking on below link </br> Message by <b>${fullName} </b> for you: ${message} <br><br> <a href="${Link}" target='_blank' > ${Link} </a>`;
}

export default signupTemplate;