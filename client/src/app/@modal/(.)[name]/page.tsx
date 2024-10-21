import { getPlantByName } from "@/actions/getPlantsByName";
import { MotionDiv } from "@/components";
import styles from "@/styles/intercept.module.css"

export default async function NameInterceptedPage ({
    params: { name }
  }: {
    params: { name: string }
  }) {
      const plant = await getPlantByName(name)

    return (
        <section  className={styles.interceptWrapper}>
            <MotionDiv className={styles.windowWrapper}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: 'easeInOut', duration: 0.75 }}>
                    {plant?.nombre}
            </MotionDiv>
        </section>
    )
}