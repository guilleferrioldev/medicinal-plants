import { getPlantByName } from "@/actions/getPlantsByName";
import { ButtonToBack, MotionDiv } from "@/components";
import styles from "@/styles/intercept.module.css"
import { showObject } from "@/utils";

export default async function NameInterceptedPage ({
    params: { name }
  }: {
    params: { name: string }
  }) {
      const plant = await getPlantByName(name)

    return (
        <section  className={styles.interceptWrapper} style={{background: '#00332970'}}>
            <MotionDiv className={styles.windowWrapper}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: 'easeInOut', duration: 0.75 }}>
                    <ButtonToBack/>
                    {plant && showObject(plant)}
            </MotionDiv>
        </section>
    )
}




