import React from 'react'

interface ProjectCardProps {
  title: string
  description: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105 transition-transform">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default ProjectCard
