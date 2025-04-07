import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  backgroundColor: string;
  textColor: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  backgroundColor,
  textColor,
  Icon,
}) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-md ${backgroundColor} ${textColor} w-full relative overflow-hidden`}
      style={{ backgroundColor, color: textColor }}
    >
      <div className="w-28 h-28 border-2 border-slate-500  rounded-full absolute right-[-20px] top-[-20px] z-0"></div>
      <div className="w-24 h-24 border-2 border-slate-700  rounded-full absolute right-[-18px] top-[-14px] z-0"></div>
      <div className="flex items-center space-x-3">
        <div className="">
          {Icon && <Icon className="w-8 h-8" color={textColor} />}
        </div>
        <div className="z-50">
          <h3 className="text-[10px] z-30">{title}</h3>
          <p className="text-3xl font-extrabold z-30">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
