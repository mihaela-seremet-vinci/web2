interface FooterProps { 
    url: string;
    children: React.ReactNode;
}


const Footer = (props: FooterProps) => {

    return (
        <footer>
        <div>{props.children}</div>
        <img src={props.url} alt="" />
        </footer>
    );
}

export default Footer;