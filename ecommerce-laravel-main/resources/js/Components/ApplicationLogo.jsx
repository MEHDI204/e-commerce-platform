export default function ApplicationLogo({ className = '', ...props }) {
    return (
        <div 
            {...props} 
            className={`font-extrabold tracking-tight text-outline ${className}`}
            style={{
                WebkitTextStroke: '2px black',
                WebkitTextFillColor: 'transparent',
                color: 'transparent'
            }}
        >
            <div className="text-3xl leading-tight">SAAD</div>
            <div className="text-2xl leading-tight">mehdi</div>
        </div>
    );
}