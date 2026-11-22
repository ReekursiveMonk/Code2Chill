import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-0 text-xl font-bold font-mono tracking-tight group">
      <span className="text-green-primary transition-all duration-300 group-hover:text-glow-green">&lt;</span>
      <span className="text-text-primary">Code2Chill</span>
      <span className="text-green-primary transition-all duration-300 group-hover:text-glow-green">/&gt;</span>
    </Link>
  );
}

export default Logo;
