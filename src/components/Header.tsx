import camtechLogo from '../assets/camtech_logo.png';

const Header: React.FC = () => {
  return (
    <header>
      <a href="https://camtech.edu.kh/" target="_blank" rel="noopener noreferrer" className="camtech-logo-link">
        <img src={camtechLogo} alt="CamTech Logo" className="camtech-logo" />
      </a>
      <div className="brand-badge">Elite Protocol v3.5 | AI Enhanced</div>
      <h1>GYM PLANNER <span className="camtech-text">CAMTECH</span></h1>

      <div className="disclaimer-banner">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '8px' }}>
          <i className="fas fa-exclamation-triangle" style={{ color: 'var(--danger)' }}></i>
          <h3 style={{ color: 'var(--danger)', margin: 0, fontSize: '1rem' }}>IMPORTANT DISCLAIMER</h3>
        </div>
        <p style={{ color: 'var(--text-main)', margin: '0 0 10px 0', fontSize: '0.85rem', lineHeight: '1.5' }}>
          <strong>GYM PLANNER CAMTECH</strong> is for informational purposes only.
          <span style={{ color: 'var(--danger)', fontWeight: '600' }}> NOT medical advice.</span>
          It is recommended to consult a gym coach before starting.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', fontSize: '0.75rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>
            <i className="fas fa-user-md"></i> Consult professionals
          </span>
          <span style={{ color: 'var(--text-muted)' }}>
            <i className="fas fa-ban"></i> Not responsible for any injuries
          </span>
          <span style={{ color: 'var(--text-muted)' }}>
            <i className="fas fa-brain"></i> AI may generate errors
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
