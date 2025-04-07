import React from "react";
import StatCard from "./stat-card";

interface StatListProps {
  stats: {
    title: string;
    value: string | number;
    backgroundColor: string;
    textColor: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }[];
}

const StatList: React.FC<StatListProps> = ({ stats }) => {
  return (
    <div className="w-full flex gap-4">
      {stats.map((stat) => (
        <StatCard
          Icon={stat.Icon}
          backgroundColor={stat.backgroundColor}
          textColor={stat.textColor}
          title={stat.title}
          value={stat.value}
          key={stat.title}
        />
      ))}
    </div>
  );
};

export default StatList;
