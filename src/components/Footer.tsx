const Footer = () => {
  return (
    <footer className="mt-20 py-8 border-t border-border">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          Built with AI • Bird Name Classifier • {new Date().getFullYear()}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Powered by advanced machine learning for accurate bird species identification
        </p>
      </div>
    </footer>
  );
};

export default Footer;
