import * as Switch from "@radix-ui/react-switch";
import { useAppContext } from "@/hooks/useAppContext";

import styles from "./styles.module.css";

const SwitchMode = () => {
  const { isAppCreateHabitsMode, setIsAppCreateHabitsMode } = useAppContext();

  return (
    <form>
      <div
        className={styles.container}
      >
        <label
          className="Label"
          htmlFor="normal-mode"
          style={{ paddingRight: 15 }}
        >
          Modo normal
        </label>
        <Switch.Root
          className={styles.SwitchRoot}
          id="normal-mode"
          checked={isAppCreateHabitsMode}
          onCheckedChange={setIsAppCreateHabitsMode}
        >
          <Switch.Thumb className={styles.SwitchThumb} />
        </Switch.Root>
        <label
          className="Label"
          htmlFor="normal-mode"
          style={{ paddingLeft: 15 }}
        >
          Cadastro de hábitos
        </label>
      </div>
    </form>
  );
};

export default SwitchMode;
