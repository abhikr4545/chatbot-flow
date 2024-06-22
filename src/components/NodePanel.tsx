import { nanoid } from 'nanoid';
import NodeType from './NodeType';
import { nodetypes } from '../data/nodeTypes';
import SettingPanel from './SettingPanel';


const NodePanel = () => {
  return (
    <div className="bg-white h-[calc(100vh-48px)] w-96 relative overflow-hidden pt-2 border-l-2">
      <div className="grid grid-cols-2  gap-4 justify-items-center">
        {
          nodetypes.map((node: { name: string, icon: React.ReactNode, id: string, type: string }, index) => 
          <NodeType id={node.id} key={nanoid()} name={node.name} icon={node.icon} position={index} type={node.type} />)
        }
      </div>
      <SettingPanel />
    </div>  
  )
}

export default NodePanel