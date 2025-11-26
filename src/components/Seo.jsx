import { useEffect } from "react";
import PropTypes from "prop-types";
import { defaultSchemas, siteMeta } from "../config/seo";

const toAbsoluteUrl = (path = "") => {
  if (!path) {
    return siteMeta.siteUrl;
  }

  try {
    return new URL(path, siteMeta.siteUrl).href;
  } catch {
    return siteMeta.siteUrl;
  }
};

const ensureArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const Seo = ({
  title,
  description,
  keywords = [],
  image,
  url = "/",
  type = "website",
  noindex = false,
  schema,
}) => {
  const pageTitle = title
    ? `${title} | ${siteMeta.siteName}`
    : siteMeta.title;
  const pageDescription = description || siteMeta.description;
  const canonicalUrl = toAbsoluteUrl(url);
  const pageImage = toAbsoluteUrl(image || siteMeta.profileImage);
  const mergedKeywords = Array.from(
    new Set([...(siteMeta.keywords || []), ...ensureArray(keywords)])
  ).join(", ");

  const schemaGraph = [...defaultSchemas, ...ensureArray(schema)];
  const structuredData =
    schemaGraph.length > 0
      ? {
        "@context": "https://schema.org",
        "@graph": schemaGraph,
      }
      : null;

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }
    const upsertMeta = (attribute, key, value) => {
      const selector = `meta[${attribute}="${key}"]`;
      let element = document.head.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      element.setAttribute("content", value);
    };

    const upsertLink = (rel, href) => {
      const selector = `link[rel="${rel}"]`;
      let element = document.head.querySelector(selector);

      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }

      element.setAttribute("href", href);
    };

    const resetStructuredData = () => {
      document
        .querySelectorAll("script[data-seo-jsonld='true']")
        .forEach((script) => script.remove());
    };

    const addStructuredData = (content) => {
      if (!content) return;
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.text = JSON.stringify(content);
      document.head.appendChild(script);
    };

    document.title = pageTitle;
    document.documentElement.lang = siteMeta.siteLanguage || "en";

    upsertMeta("name", "description", pageDescription);
    upsertMeta("name", "keywords", mergedKeywords);
    upsertMeta("name", "author", "Yousef Bakr");
    upsertMeta(
      "name",
      "robots",
      noindex ? "noindex,nofollow" : "index,follow,max-image-preview:large"
    );

    upsertMeta("property", "og:site_name", siteMeta.siteName);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:locale", siteMeta.locale || "en_US");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:title", pageTitle);
    upsertMeta("property", "og:description", pageDescription);
    upsertMeta("property", "og:image", pageImage);
    upsertMeta("property", "og:image:alt", pageDescription);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:site", siteMeta.twitterHandle || "");
    upsertMeta("name", "twitter:title", pageTitle);
    upsertMeta("name", "twitter:description", pageDescription);
    upsertMeta("name", "twitter:image", pageImage);

    upsertMeta("name", "theme-color", "#020617");
    upsertMeta("name", "application-name", siteMeta.siteName);

    upsertLink("canonical", canonicalUrl);

    resetStructuredData();
    addStructuredData(structuredData);
  }, [
    pageTitle,
    pageDescription,
    mergedKeywords,
    canonicalUrl,
    pageImage,
    type,
    noindex,
    JSON.stringify(structuredData),
  ]);

  return null;
};

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  noindex: PropTypes.bool,
  schema: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

Seo.defaultProps = {
  keywords: [],
  url: "/",
  type: "website",
  noindex: false,
};

export default Seo;
