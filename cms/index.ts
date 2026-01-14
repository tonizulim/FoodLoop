import { createClient } from "contentful";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN;

if (!space || !accessToken) {
  throw new Error(
    "Contentful env vars missing. Check CONTENTFUL_SPACE_ID and CONTENTFUL_DELIVERY_TOKEN."
  );
}

const cms = createClient({
  space,
  accessToken,
});

export default cms;
