interface ExternalLinkProps {
    href: string;
    children: React.ReactNode;
}

function ExternalLink({ href, children }: ExternalLinkProps) {
    const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const url = new URL(href);
        const domain = url.hostname;
        const virusTotalUrl = `https://www.virustotal.com/gui/domain/${domain}`;

        try {
            const response = await fetch(virusTotalUrl, { mode: 'no-cors' });
            if (response.ok) {
                window.open(href, '_blank', 'noopener noreferrer');
            } else {
                throw new Error('La solicitud no fue exitosa');
            }
        } catch (error) {
            console.error('Error al verificar el dominio:', error);
            alert('No se pudo verificar la seguridad del dominio. Abriendo el enlace de todos modos.');
            window.open(href, '_blank', 'noopener noreferrer');
        }
    };

    return (
        <a href={href} onClick={handleClick}>
            {children}
        </a>
    );
}

export default ExternalLink;