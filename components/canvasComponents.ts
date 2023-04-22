import { registerUniformComponent } from "@uniformdev/canvas-react";

import Hero from "../mitosis-output/react/src/client/src/components/hero";
import Cta from "../mitosis-output/react/src/client/src/components/cta";
import Title from "../mitosis-output/react/src/client/src/components/title";
import RichText from "../mitosis-output/react/src/client/src/components/rich-text";
import TwoColumn from "../mitosis-output/react/src/client/src/components/two-column";
import List from "../mitosis-output/react/src/client/src/components/list"
import Card from "../mitosis-output/react/src/client/src/components/card"
import Container from "../mitosis-output/react/src/client/src/components/container"
import StandAloneImage from "../mitosis-output/react/src/client/src/components/standalone-image"

registerUniformComponent({ type: "hero", component: Hero });
registerUniformComponent({ type: "twoColumn", component: TwoColumn });
registerUniformComponent({ type: "cta", component: Cta });
registerUniformComponent({ type: "standAloneImage", component: StandAloneImage });

registerUniformComponent({ type: "container", component: Container })
registerUniformComponent({ type: "container", variantId: "fullWidth", component: Container })

registerUniformComponent({ type: "list", component: List });
registerUniformComponent({ type: "list", variantId: "grid", component: List });
registerUniformComponent({ type: "list", variantId: "list", component: List });

registerUniformComponent({ type: "card", component: Card });
registerUniformComponent({ type: "card", variantId: "small", component: Card });

registerUniformComponent({ type: "title", component: Title });
registerUniformComponent({ type: "title", variantId: "small", component: Title });
registerUniformComponent({ type: "title", variantId: "medium", component: Title });
registerUniformComponent({ type: "title", variantId: "large", component: Title });

registerUniformComponent({ type: "richText", component: RichText });
registerUniformComponent({ type: "richText", variantId: "addedSpace", component: RichText });