"use client";

import { Fade } from "react-reveal";

function FadeAnimation({ children, ...others }) {
	return <Fade {...others}>{children}</Fade>;
}

export default FadeAnimation;
