require 'erb'

# Racker
class Racker
  def call(env)
    @request = Rack::Request.new(env)
    case @request.path
    when '/' then index
    when '/set_wakeup_dt' then set_wakeup_dt
    else not_found
    end
  end

  def render(template)
    path = File.expand_path("../views/#{template}", __FILE__)
    ERB.new(File.read(path)).result(binding)
  end

  def index
    Rack::Response.new(render('index.html.erb'))
  end

  def set_wakeup_dt
    @wakeup = DateTime.new(@request[:wakeup_dt])
    Rack::Response.new(@wakeup)
  end

  def set_current_client_dt
    @current = DateTime.new(@request[:current_dt])
    Rack::Response.new(@current)
  end

  def not_found
    Rack::Response.new('Not Found', 404)
  end
end
