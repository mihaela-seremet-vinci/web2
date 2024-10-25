import DrinkCard from "./DrinkCard";
import { ReactElement } from 'react';


interface DrinkMenuProps {
    title: string;
    children: ReactElement<typeof DrinkCard> | ReactElement<typeof DrinkCard>[] ; 
  }
  
  const DrinkMenu = ({ title, children }: DrinkMenuProps) => {
    return (
      <div className="drink-menu">
        <h4>{title}</h4>
        <div className="drink-items">{children}</div>
      </div>
    );
  };
  
  
  export default DrinkMenu;
  