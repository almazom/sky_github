set :application, 'spy_watch'
set :server_name, '109.74.205.9'
set :branch, 'master'

set :user, 'deployer'

set :repository, 'git@bitbucket.org:tataronrails/spy_watch.git'
set :scm, :git
set :deploy_to, "/home/#{user}/www/apps/#{application}"
set :deploy_via, :remote_cache
set :use_sudo, false


role :web, server_name
role :app, server_name
role :db,  server_name, :primary => true

# Override default tasks which are not relevant to a non-rails app.
namespace :deploy do
  task :migrate do
    puts "Skipping migrate."
  end
  task :finalize_update do
    puts "Skipping finalize_update."
  end
  task :start do
    puts "Skipping start."
  end
  task :stop do
    puts "Skipping stop."
  end
  task :restart do
    puts "Skipping restart."
  end
end

#namespace :remote do
#  task :create_symlink, :roles => :web do
#    print "creating symlink ~/public_html/#{application} -> #{current_path}.\n"
#    run "ln -s #{current_path} #{deploy_to}/current"
#  end
#end

# leave only 5 releases
after "deploy", "deploy:cleanup"
