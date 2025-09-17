import { useGLTF } from '@react-three/drei'

export default function RobotModel(props: any) {
  const { scene } = useGLTF('/models/robot.glb') // ✅ public folder path
  return <primitive object={scene} {...props} />
}
