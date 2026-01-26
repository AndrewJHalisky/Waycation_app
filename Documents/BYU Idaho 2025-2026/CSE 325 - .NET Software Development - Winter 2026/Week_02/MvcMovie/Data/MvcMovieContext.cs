using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MvcMovie.Models;

namespace MvcMovie.Data
{
    public class MvcMovieContext : DbContext
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>()
                .Property(m => m.Price)
                .HasPrecision(18, 2); // or .HasColumnType("decimal(18,2)");
        }
        public MvcMovieContext(DbContextOptions<MvcMovieContext> options)
            : base(options)
        {
        }
        public DbSet<Movie> Movie { get; set; }
    }
}