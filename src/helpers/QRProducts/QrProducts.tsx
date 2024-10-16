import QRCode from 'qrcode.react';

interface QRCodeProps {
    value: string;
    size?: number;
    bgColor?: string;
    fgColor?: string;
}

function QrProducts({ value, size = 128, bgColor = "#ffffff", fgColor = "#000000" }: QRCodeProps) {
    return (
        <QRCode
            value={value}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
        />
    );
}

export default QrProducts;