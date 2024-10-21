import { getPlantByName } from "@/actions/getPlantsByName";
import { ButtonToReturn, MotionDiv } from "@/components";
import styles from "@/styles/intercept.module.css"
import { showObject } from "@/utils";

export default async function NamePage ({
    params: { name }
  }: {
    params: { name: string }
  }) {
      const plant = await getPlantByName(name)

    return (
        <section  className={styles.interceptWrapper} style={{background: '#003329'}}>
            <MotionDiv className={styles.windowWrapper}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: 'easeInOut', duration: 0.75 }}>
                    <ButtonToReturn/>
                    {plant && showObject(plant)}
            </MotionDiv>
        </section>
    )
}
