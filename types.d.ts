import type { Object3DNode } from '@react-three/fiber'
import * as THREE from 'three'

declare global {
    namespace JSX {
        interface IntrinsicElements {
            mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>
            group: Object3DNode<THREE.Group, typeof THREE.Group>
            ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>
            directionalLight: Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>
            pointLight: Object3DNode<THREE.PointLight, typeof THREE.PointLight>
            spotLight: Object3DNode<THREE.SpotLight, typeof THREE.SpotLight>
            hemisphereLight: Object3DNode<THREE.HemisphereLight, typeof THREE.HemisphereLight>
            rectAreaLight: Object3DNode<THREE.RectAreaLight, typeof THREE.RectAreaLight>
            planeLight: Object3DNode<THREE.PlaneLight, typeof THREE.PlaneLight>
            lightProbe: Object3DNode<THREE.LightProbe, typeof THREE.LightProbe>
            camera: Object3DNode<THREE.Camera, typeof THREE.Camera>
            perspectiveCamera: Object3DNode<THREE.PerspectiveCamera, typeof THREE.PerspectiveCamera>
            orthographicCamera: Object3DNode<THREE.OrthographicCamera, typeof THREE.OrthographicCamera>
            scene: Object3DNode<THREE.Scene, typeof THREE.Scene>
            object3D: Object3DNode<THREE.Object3D, typeof THREE.Object3D>
            sprite: Object3DNode<THREE.Sprite, typeof THREE.Sprite>
            points: Object3DNode<THREE.Points, typeof THREE.Points>
            line: Object3DNode<THREE.Line, typeof THREE.Line>
            lineLoop: Object3DNode<THREE.LineLoop, typeof THREE.LineLoop>
            lineSegments: Object3DNode<THREE.LineSegments, typeof THREE.LineSegments>
            instancedMesh: Object3DNode<THREE.InstancedMesh, typeof THREE.InstancedMesh>
            skinnedMesh: Object3DNode<THREE.SkinnedMesh, typeof THREE.SkinnedMesh>
            bone: Object3DNode<THREE.Bone, typeof THREE.Bone>
            lod: Object3DNode<THREE.LOD, typeof THREE.LOD>
            fog: Object3DNode<THREE.Fog, typeof THREE.Fog>
            fogExp2: Object3DNode<THREE.FogExp2, typeof THREE.FogExp2>
            gridHelper: Object3DNode<THREE.GridHelper, typeof THREE.GridHelper>
            polarGridHelper: Object3DNode<THREE.PolarGridHelper, typeof THREE.PolarGridHelper>
            axesHelper: Object3DNode<THREE.AxesHelper, typeof THREE.AxesHelper>
            boxHelper: Object3DNode<THREE.BoxHelper, typeof THREE.BoxHelper>
            box3Helper: Object3DNode<THREE.Box3Helper, typeof THREE.Box3Helper>
            planeHelper: Object3DNode<THREE.PlaneHelper, typeof THREE.PlaneHelper>
            arrowHelper: Object3DNode<THREE.ArrowHelper, typeof THREE.ArrowHelper>
            cameraHelper: Object3DNode<THREE.CameraHelper, typeof THREE.CameraHelper>
            directionLightHelper: Object3DNode<THREE.DirectionalLightHelper, typeof THREE.DirectionalLightHelper>
            hemisphereLightHelper: Object3DNode<THREE.HemisphereLightHelper, typeof THREE.HemisphereLightHelper>
            pointLightHelper: Object3DNode<THREE.PointLightHelper, typeof THREE.PointLightHelper>
            spotLightHelper: Object3DNode<THREE.SpotLightHelper, typeof THREE.SpotLightHelper>
            rectAreaLightHelper: Object3DNode<THREE.RectAreaLightHelper, typeof THREE.RectAreaLightHelper>
            skeletonHelper: Object3DNode<THREE.SkeletonHelper, typeof THREE.SkeletonHelper>
            wireframeGeometry: Object3DNode<THREE.WireframeGeometry, typeof THREE.WireframeGeometry>
            parametricGeometry: Object3DNode<THREE.ParametricGeometry, typeof THREE.ParametricGeometry>
            tetrahedronGeometry: Object3DNode<THREE.TetrahedronGeometry, typeof THREE.TetrahedronGeometry>
            octahedronGeometry: Object3DNode<THREE.OctahedronGeometry, typeof THREE.OctahedronGeometry>
            icosahedronGeometry: Object3DNode<THREE.IcosahedronGeometry, typeof THREE.IcosahedronGeometry>
            dodecahedronGeometry: Object3DNode<THREE.DodecahedronGeometry, typeof THREE.DodecahedronGeometry>
            torusGeometry: Object3DNode<THREE.TorusGeometry, typeof THREE.TorusGeometry>
            torusKnotGeometry: Object3DNode<THREE.TorusKnotGeometry, typeof THREE.TorusKnotGeometry>
            tubeGeometry: Object3DNode<THREE.TubeGeometry, typeof THREE.TubeGeometry>
            sphereGeometry: Object3DNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>
            ringGeometry: Object3DNode<THREE.RingGeometry, typeof THREE.RingGeometry>
            planeGeometry: Object3DNode<THREE.PlaneGeometry, typeof THREE.PlaneGeometry>
            circleGeometry: Object3DNode<THREE.CircleGeometry, typeof THREE.CircleGeometry>
            coneGeometry: Object3DNode<THREE.ConeGeometry, typeof THREE.ConeGeometry>
            cylinderGeometry: Object3DNode<THREE.CylinderGeometry, typeof THREE.CylinderGeometry>
            boxGeometry: Object3DNode<THREE.BoxGeometry, typeof THREE.BoxGeometry>
            capsuleGeometry: Object3DNode<THREE.CapsuleGeometry, typeof THREE.CapsuleGeometry>
            shapeGeometry: Object3DNode<THREE.ShapeGeometry, typeof THREE.ShapeGeometry>
            extrudeGeometry: Object3DNode<THREE.ExtrudeGeometry, typeof THREE.ExtrudeGeometry>
            latheGeometry: Object3DNode<THREE.LatheGeometry, typeof THREE.LatheGeometry>
            edgesGeometry: Object3DNode<THREE.EdgesGeometry, typeof THREE.EdgesGeometry>
            textGeometry: Object3DNode<THREE.TextGeometry, typeof THREE.TextGeometry>
        }
    }
}

export { }
