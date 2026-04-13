import {ReactNode, MouseEventHandler} from "react";

type RoundProps = {
  to: string;
  children: ReactNode;
}

const RouterLink = (props: RoundProps) => {
  const { to, children, ...rest } = props;

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    window.history.pushState({}, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

export default RouterLink;
