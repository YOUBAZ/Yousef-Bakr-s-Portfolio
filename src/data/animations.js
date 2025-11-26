/**
 * Lottie animation data for the portfolio
 * Extracted from inline definitions for better organization and reusability
 */

/**
 * Hero pulse animation - Expanding ring effect
 * Used on the Home page to demonstrate micro-interactions
 */
export const heroAnimationData = {
    v: "5.7.6",
    fr: 60,
    ip: 0,
    op: 180,
    w: 200,
    h: 200,
    nm: "pulse",
    ddd: 0,
    assets: [],
    layers: [
        {
            ddd: 0,
            ind: 1,
            ty: 4,
            nm: "ring",
            sr: 1,
            ks: {
                o: {
                    a: 1,
                    k: [
                        { s: 0, e: 100, t: 0 },
                        { s: 100, e: 0, t: 180 },
                    ],
                },
                r: { a: 0, k: 0 },
                p: { a: 0, k: [100, 100, 0] },
                a: { a: 0, k: [0, 0, 0] },
                s: {
                    a: 1,
                    k: [
                        { s: [0, 0, 100], e: [120, 120, 100], t: 0 },
                        { s: [120, 120, 100], e: [0, 0, 100], t: 180 },
                    ],
                },
            },
            shapes: [
                {
                    ty: "el",
                    p: { a: 0, k: [0, 0] },
                    s: { a: 0, k: [160, 160] },
                    nm: "circle-path",
                },
                {
                    ty: "st",
                    c: { a: 0, k: [0.39, 0.85, 0.99, 1] },
                    o: { a: 0, k: 100 },
                    w: { a: 0, k: 6 },
                    lc: 2,
                    lj: 2,
                    nm: "stroke",
                },
                {
                    ty: "tr",
                    p: { a: 0, k: [0, 0] },
                    a: { a: 0, k: [0, 0] },
                    s: { a: 0, k: [100, 100] },
                    r: { a: 0, k: 0 },
                    o: { a: 0, k: 100 },
                    sk: { a: 0, k: 0 },
                    sa: { a: 0, k: 0 },
                },
            ],
            ip: 0,
            op: 180,
            st: 0,
            bm: 0,
        },
    ],
};
