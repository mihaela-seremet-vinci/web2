interface HeaderProps { 
    url: string;
    children: React.ReactNode;
}

const Header = (props: HeaderProps) => {
    return (
        <header>
        <div>{props.children}</div>
        <img src={props.url} alt="" />
        </header>
    );
}

export default Header;