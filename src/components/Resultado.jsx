function isPlainObject(val) {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}

function tryFormatDate(val) {
  if (typeof val !== "string" && typeof val !== "number") return null;
  const parsed = new Date(val);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleString();
}

function formatPrimitive(value) {
  if (value === null || value === undefined) return "-";
  if (typeof value === "number") {
    return Number.isInteger(value) ? value : value.toFixed(2);
  }
  if (typeof value === "boolean") return value.toString();

  const asDate = tryFormatDate(value);
  if (asDate) return `${asDate} (raw: ${String(value)})`;

  return String(value);
}

function renderValue(value) {
  // Percent metadata
  if (isPlainObject(value) && "percent" in value) {
    return `${value.percent}%`;
  }

  // Array: show indexed table, preserving all items
  if (Array.isArray(value)) {
    return (
      <div className="array-value">
        <div className="array-summary">Array com {value.length} itens</div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {value.map((item, idx) => (
              <tr key={idx}>
                <td>{idx}</td>
                <td>{renderValue(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Plain object: pretty-print JSON to avoid data loss
  if (isPlainObject(value)) {
    return (
      <pre className="object-value" title="Objeto bruto">
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  }

  // Primitives and other types
  return formatPrimitive(value);
}

export default function Resultado({ data }) {
  if (!data) return null;

  return (
    <div className="resultado">
      <h2>Resultado da IA</h2>

      {Object.keys(data).map((key) => {
        const section = data[key];
        const isSectionArray = Array.isArray(section);
        const isSectionObject = isPlainObject(section);

        return (
          <div key={key}>
            <h3>{key}</h3>

            {isSectionArray ? (
              <div className="array-value">
                <div className="array-summary">
                  Array com {section.length} itens
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx}</td>
                        <td>{renderValue(item)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : isSectionObject ? (
              <table>
                <thead>
                  <tr>
                    <th>Parâmetro</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(section).map((param) => (
                    <tr key={param}>
                      <td>{param}</td>
                      <td>{renderValue(section[param])}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>{renderValue(section)}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
