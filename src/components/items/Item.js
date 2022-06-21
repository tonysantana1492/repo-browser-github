import { Link } from "react-router-dom";
import classes from "./Item.module.css";

const Item = (props) => {
  const type = props.type;
  const folderSvg = (
    <path d="M1.75 1A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H7.5a.25.25 0 01-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75z"></path>
  );
  const fileSvg = (
    <path
      fill-rule="evenodd"
      d="M3.75 1.5a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 00.25-.25V6h-2.75A1.75 1.75 0 019 4.25V1.5H3.75zm6.75.062V4.25c0 .138.112.25.25.25h2.688a.252.252 0 00-.011-.013l-2.914-2.914a.272.272 0 00-.013-.011zM2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V1.75z"
    ></path>
  );
  
  let toTypeContent = null;
  let icon = folderSvg;
  let color = '#5d8ecf';
  

  if (!type || type === undefined) {
    //Get Content a repo
    toTypeContent = `/home?url=${props.url}/contents&type=null`;    
  } else if (type === "dir") {
    //Get Content a Dir
    toTypeContent = `/home?url=${props.url}&type=${type}`;    
  } else {
    //Get content a File
    toTypeContent = `/home?url=${props.url}&type=${type}`;
    icon = fileSvg;
    color = 'black';
  }
  
  return (
    <div className={classes.container}>
      <svg className={classes.picture} style={{fill: `${color}`}}>{icon}</svg>
      <Link className={classes.link} to={toTypeContent}>
        {props.name}
      </Link>
    </div>
  );
};

export default Item;
