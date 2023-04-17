import * as React from 'react';
import './style.css';

const blendModes = [
  'overlay',
  'normal',
  'multiply',
  'screen',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
];

export default function App() {
  const options = [
    'item111111111',
    'item2222',
    'item33',
    'item444444',
    'item555',
  ];

  const [mixBlendMode, setMixBlendMode] = React.useState<string>(blendModes[0]);

  return (
    <div className="page">
      <Navbar options={options} mixBlendMode={mixBlendMode} />

      <select
        value={mixBlendMode}
        onChange={(e) => setMixBlendMode(e.target.value)}
      >
        {blendModes.map((mode) => (
          <option key={mode}>{mode}</option>
        ))}
      </select>
    </div>
  );
}

function Navbar({
  options,
  mixBlendMode,
}: {
  options: string[];
  mixBlendMode: string;
}) {
  const [selected, setSelected] = React.useState<number>(0);

  const [indicatorStyle, setIndicatorStyle] =
    React.useState<React.CSSProperties>({});

  const ref = React.useRef<HTMLUListElement>();

  const useUpdateIndicatorStyle = React.useCallback((selected: number) => {
    const container = ref.current;
    const target = container?.querySelector(`li:nth-child(${selected + 1})`);
    if (!target) return;

    const { top: containerTop, left: containerLeft } =
      container.getBoundingClientRect();
    const { top, left, width, height } = target.getBoundingClientRect();

    setIndicatorStyle({
      top: top - containerTop,
      left: left - containerLeft,
      width,
      height,
    });
  }, []);

  React.useEffect(() => {
    useUpdateIndicatorStyle(selected);
  }, [selected]);

  return (
    <ul className="navbar" ref={ref}>
      {options.map((opt, i) => (
        <li key={opt} onClick={() => setSelected(i)}>
          {opt}
        </li>
      ))}
      <span
        className="indicator"
        style={{ ...indicatorStyle, mixBlendMode }}
      ></span>
    </ul>
  );
}
