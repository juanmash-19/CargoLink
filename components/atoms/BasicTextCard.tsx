import React from 'react';

interface BasicTextCardProps {
    title: string;
    subtitles?: { label: string; content: string | React.ReactNode }[];
    bgColor?: string;
    titleColor?: string;
    textColor?: string;
}

export default function BasicTextCard({
    title,
    subtitles = [],
    bgColor = 'bg-gray-50',
    titleColor = 'text-gray-700',
    textColor = 'text-gray-600',
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