import React from 'react';

interface TagsDiscoveryProps {

}

const TagsDiscovery: React.FC<TagsDiscoveryProps> = () => {
  return (
    <div className="text-center bg-white p-20 w-100% ">
      <p className="text-base">
      Dive into the world of coding and explore new programming languages. 
      Our platform is a hub for not only finding solutions but also for broadening your coding horizons. 
      Discover exciting languages, techniques, and approaches you might not have encountered otherwise. <br/><br/>
      Click on one of the tags below to find out more! 
      </p>
    {/* random tags logic here for discovery  */}
    </div>
  )
}

export default TagsDiscovery