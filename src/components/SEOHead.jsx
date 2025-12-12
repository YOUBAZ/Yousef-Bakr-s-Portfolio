import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

/**
 * SEO component for managing meta tags dynamically
 */
const SEOHead = ({
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage,
    ogType = 'website',
    publishDate,
    lastModified,
    author,
    structuredData
}) => {
    const siteUrl = 'https://yousef-bakr-s-portfolio.vercel.app';
    const fullUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
    const fullImageUrl = ogImage?.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {ogImage && <meta property="og:image" content={fullImageUrl} />}
            <meta property="og:site_name" content="Yousef Bakr - Software Engineer Portfolio" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            {ogImage && <meta property="twitter:image" content={fullImageUrl} />}
            <meta property="twitter:site" content="@yousefbakr" />

            {/* Article specific tags */}
            {ogType === 'article' && (
                <>
                    {publishDate && (
                        <meta property="article:published_time" content={publishDate} />
                    )}
                    {lastModified && (
                        <meta property="article:modified_time" content={lastModified} />
                    )}
                    {author && <meta property="article:author" content={author} />}
                </>
            )}

            {/* Structured Data (JSON-LD) */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

SEOHead.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    keywords: PropTypes.string,
    canonicalUrl: PropTypes.string,
    ogImage: PropTypes.string,
    ogType: PropTypes.string,
    publishDate: PropTypes.string,
    lastModified: PropTypes.string,
    author: PropTypes.string,
    structuredData: PropTypes.object
};

export default SEOHead;
