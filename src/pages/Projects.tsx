// import React from 'react'
import ProjectCard from '../components/ProjectCard/ProjectCard'

const Projects = () => {
  const projects = [
    { title: "Project 1", description: "Description 1" },
    { title: "Project 2", description: "Description 2" },
    { title: "Project 3", description: "Description 3" },
  ]

  return (
    <section className="section px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={i} title={p.title} description={p.description} />
        ))}
      </div>
    </section>
  )
}

export default Projects
