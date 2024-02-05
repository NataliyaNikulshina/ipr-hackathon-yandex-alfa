const SvgButton = (props) => {

  const elementName = props.elementName ? props.elementName : '';

  const handleClick = props.onClick ? props.onClick : () => { };

  return (
    <button type="button" onClick={handleClick}
      className={`${props.elementStyle[`${elementName}${props.elementType}__${props.destiny}`]}`}>
      <svg className={`${props.elementStyle[`${elementName}${props.elementType}__${props.destiny}-icon-box`]} `}
        viewBox={`${props.viewBox}`} xmlns="http://www.w3.org/2000/svg" >
        <use className={`${props.elementStyle[`${elementName}${props.elementType}__${props.destiny}-icon`]} `}
          href={`${props.svgHref}${props.svgId}`} data-item-value={props.dataItemValue ? props.dataItemValue : ''}/>
      </svg>
    </button>
  );
};

export default SvgButton;

