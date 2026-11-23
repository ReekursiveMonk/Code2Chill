import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-0 text-xl font-bold font-mono tracking-tight">
      <span className="text-accent">&lt;</span>
      <span className="text-text-primary">Code2Chill</span>
      <span className="text-accent">/&gt;</span>
    </Link>
  );
}

export default Logo;
