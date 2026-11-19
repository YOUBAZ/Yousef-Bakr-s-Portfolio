import PropTypes from "prop-types";

/**
 * The Home hero's one rich object: an architecture decision record, laid out
 * like a spec-sheet record — header strip, fields, footer strip. It carries the
 * brand's argument: a decision, the reason, and what it bought.
 *
 * Every line is a fact already published elsewhere on the site. Do not add a
 * row that is not.
 */
const DecisionRecord = ({ id, project, status, rows, footer }) => (
  <figure className="ybz-record" aria-label={`Decision record: ${project}`}>
    {/* One signal marker down the leading edge: the record's status line. */}
    <span className="ybz-record__rail" aria-hidden="true">
      <span style={{ flexGrow: 1 }} />
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
