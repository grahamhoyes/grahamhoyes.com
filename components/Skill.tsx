import colors from "tailwindcss/colors";
import { useTheme } from "next-themes";

interface SkillProps {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  dark?: boolean;
}

// const Skill = ({ name, level }: SkillProps) => {
//   const achievedLevels: boolean[] = [];

//   for (let i = 5; i > 0; i--) {
//     if (i <= level) {
//       achievedLevels.push(true);
//     } else {
//       achievedLevels.push(false);
//     }
//   }

//   return (
//     <div className="mx-2 inline-flex w-fit rounded border-2 border-black bg-black">
//       <div className="rounded-l-sm bg-green-500 p-2 text-xs font-semibold uppercase">
//         {name}
//       </div>
//       <div className="flex w-8 flex-col">
//         {achievedLevels.map((achieved, i) => (
//           <div
//             key={i}
//             className={`w-full grow ${
//               achieved ? "bg-purple-500" : "bg-white"
//             } ${i === 4 && "rounded-br-sm"} ${i === 0 && "rounded-tr-sm"}`}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// };

const Skill = ({ name, level }: SkillProps) => {
  const sizes = ["h-[20%]", "h-[40%]", "h-[60%]", "h-[80%]", "h-full"];

  return (
    <div className="mx-2 inline-flex w-fit rounded">
      <div className="rounded-l-sm bg-green-500 p-2 text-xs font-semibold uppercase">
        {name}
      </div>
      <div className="relative flex w-8 bg-white">
        <div
          className={`absolute bottom-0 w-full rounded-br bg-purple-500 ${
            sizes[level - 1]
          } ${level === 5 && "rounded-tr"}`}
        ></div>
      </div>
    </div>
  );
};

type SkillWheelProps = Pick<SkillProps, "level" | "dark">;

export const SkillWheel = ({ level, dark }: SkillWheelProps) => {
  const { theme, resolvedTheme } = useTheme();

  const percentage = level * 20;

  dark =
    dark === undefined ? theme === "dark" || resolvedTheme === "dark" : dark;

  const bg = dark ? colors.gray[800] : colors.gray[100];

  // The radial gradient that defines the radial portion of the
  // skill wheel - this basically defines the thickness. 5% buffer
  // between color stops to provide reasonable smoothing when the
  // wheel is really small.
  const radialGradient = `radial-gradient(closest-side circle, ${bg} 55%, transparent 60%, transparent 85%, ${bg} 90%)`;

  // Conic gradient that is visible through the transparent portion
  // of the radial gradient, that is the skill wheel itself.
  const conicGradient = `conic-gradient(${colors.sky[500]} ${percentage}%, ${
    dark ? colors.gray[200] : colors.gray[300]
  } ${percentage + 1}%)`;

  return (
    <div className="flex items-center justify-center">
      <div
        className="h-8 w-9 rounded-r-sm"
        style={{
          background: `${radialGradient}, ${conicGradient}`,
        }}
      />
    </div>
  );
};

export const RoundSkill = ({ name, level, dark }: SkillProps) => {
  return (
    <div className="mx-2 inline-flex w-fit rounded">
      <div className="flex items-center justify-center rounded-l-sm bg-green-500 p-2 text-xs font-semibold uppercase">
        {name}
      </div>
      <SkillWheel level={level} dark={dark} />
    </div>
  );
};

export default Skill;
