"use client";

import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
};

const StatCard = ({ title, value, icon, iconBg }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg sm:text-md font-medium text-gray-600">
              {title}
            </p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900">
              {value}
            </p>
          </div>
          <div
            className={`size-10 sm:size-12 rounded-lg flex items-center justify-center ${iconBg}`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
