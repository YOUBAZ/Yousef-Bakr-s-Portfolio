import PropTypes from "prop-types";

/**
 * The Home hero's one rich object: an architecture decision record, set as a
 * midnight panel in both themes. BRAND.md section 3.5 rule 5 makes the dark
 * object on a light page the signature; this is that object, carrying the
 * brand's argument — a decision, the reason, and what it bought.
 *
 * Every line is a fact already published elsewhere on the site. Do not add a
 * row that is not.
 */
const DecisionRecord = ({ id, project, status, rows, footer }) => (
  <figure className="ybz-record" aria-label={`Decision record: ${project}`}>
    {/* The stack rail, section 5 device 1: three segments at 100 / 55 / 30%. */}
    <span className="ybz-record__rail" aria-hidden="true">
      <span style={{ flexGrow: 1, opacity: 1 }} />
      <span style={{ flexGrow: 0.75, opacity: 0.55 }} />
      <span style={{ flexGrow: 0.5, opacity: 0.3 }} />
    </span>

    <figcaption className="ybz-record__bar">
      <span>
        {id} · {project}
      </span>
      <span className="ybz-record__status">{status}</span>
    </figcaption>

    <dl className="ybz-record__body">
      {rows.map((row) => (
        <div key={row.term} className="ybz-record__row">
          <dt className="ybz-record__term">{row.term}</dt>
          <dd
            className={
              row.emphasis
                ? "ybz-record__value ybz-record__value--key"
                : "ybz-record__value"
            }
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>

    {footer && <div className="ybz-record__foot">{footer}</div>}
  </figure>
);

DecisionRecord.propTypes = {
  id: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      term: PropTypes.string.isRequired,
      value: PropTypes.node.isRequired,
      emphasis: PropTypes.bool,
    })
  ).isRequired,
  footer: PropTypes.node,
};

export default DecisionRecord;
