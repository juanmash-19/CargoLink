interface BasicTextCardProps {
    title: string;
    subtitles: { label: string; content: string | React.ReactNode }[];
    bgColor?: string;
    titleColor?: string;
    textColor?: string;

}

export default function BasicTextCardProps({
    title,
    subtitles,
    bgColor = 'bg-gray-50', // Valor por defecto
    titleColor = 'text-gray-700', // Valor por defecto
    textColor = 'text-gray-600', // Valor por defecto
}: BasicTextCardProps) {
    
    return (
        <div className={`${bgColor} p-4 rounded-lg py-5`}>
            <h2 className={`text-lg font-semibold ${titleColor} mb-2`}>{title}</h2>
            {subtitles.map((subtitle, index) => (
                <p key={index} className={`${textColor}`}>
                    <span className="font-medium">{subtitle.label}:</span> {subtitle.content}
                </p>
            ))}
        </div>
    );
}