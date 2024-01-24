const SvgButton = (props) => {

  const handleClick = props.onClick ? props.onClick : () => { };

  return (
    <button type="button" onClick={handleClick}
      className={`${props.elementStyle[`${props.elementName}-${props.elementType}__${props.destiny}`]}`}>
      <svg className={`${props.elementStyle[`${props.elementName}-${props.elementType}__${props.destiny}-icon-box`]} `}
        viewBox={`${props.viewBox}`} xmlns="http://www.w3.org/2000/svg" >
        <use className={`${props.elementStyle[`${props.elementName}-${props.elementType}__${props.destiny}-icon`]} `}
          href={`${props.svgHref}${props.svgId}`} />
      </svg>
    </button>
  );
};

export default SvgButton;

