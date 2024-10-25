interface  PageTitleProps{
  pageTitle: string;
}

const PageTitle = (props: PageTitleProps) => {
    return <h1>{props.pageTitle}</h1>;
  };

  export default PageTitle;

