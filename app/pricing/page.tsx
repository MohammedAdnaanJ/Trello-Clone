"use client";
import { PricingTable } from "@clerk/nextjs";

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="py-12 container mx-auto px-4">
        <div className="text-center mb-12 ">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600">
            Select the Perfect Plan for your needs.
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <PricingTable newSubscriptionRedirectUrl="/dashboard" />
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
