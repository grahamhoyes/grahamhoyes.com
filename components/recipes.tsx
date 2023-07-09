import { ReactNode } from "react";

interface IngredientsProps {
  children: ReactNode;
}

export const Ingredients = ({ children }: IngredientsProps) => {
  return (
    <div className="lg:sticky lg:top-0 lg:col-span-1 lg:mt-10 lg:h-fit">
      <h1 className="mt-0">Ingredients</h1>
      {children}
    </div>
  );
};

interface StepsProps {
  children: ReactNode;
}

export const Steps = ({ children }: StepsProps) => {
  return (
    <div className="mx-auto lg:col-span-3 lg:mt-10">
      <h1 className="mt-0">Steps</h1>
      {children}
    </div>
  );
};
