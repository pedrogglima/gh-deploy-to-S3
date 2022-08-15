import React from 'react';

type Props = {
  text: string;
  match: string;
  color?: string;
};

const Highlight = (props: Props): JSX.Element => {
  const [first, ...restOfTheTexts] = props.text.split(props.match);

  return (
    <span className={props.color ? `nyx-highlight__${props.color}` : ''}>
      {first}
      {restOfTheTexts.map((text, i) => (
        <React.Fragment key={i}>
          <strong className="nyx-highlight--match">{props.match}</strong>
          {text}
        </React.Fragment>
      ))}
    </span>
  );
};

export default Highlight;
