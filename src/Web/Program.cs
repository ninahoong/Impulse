using Infrastructure; // Add this using statement

var builder = WebApplication.CreateBuilder(args);

// This call scans the Infrastructure project and registers the DbContext
builder.Services.AddInfrastructureServices(builder.Configuration);

// We still need to add Controllers to the service collection
builder.Services.AddControllers();

// Add CORS policy from our previous step
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJs", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


var app = builder.Build();

// --- Configure the HTTP request pipeline ---

if (app.Environment.IsDevelopment())
{
    // In development, you might want Swagger for API testing
    // builder.Services.AddEndpointsApiExplorer();
    // builder.Services.AddSwaggerGen();
    // app.UseSwagger();
    // app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowNextJs"); // Use the CORS policy

app.UseAuthorization();

app.MapControllers(); // This maps the routes from your Controller files

app.Run();
